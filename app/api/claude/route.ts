
// import Anthropic from "@anthropic-ai/sdk";
// import { NextResponse } from "next/server";
// import mammoth from "mammoth";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";
// export const maxDuration = 60;

// // ✅ Polyfill browser globals BEFORE pdfjs is imported
// if (typeof globalThis.DOMMatrix === "undefined") {
//   (globalThis as any).DOMMatrix = class DOMMatrix {
//     constructor() {}
//   };
// }
// if (typeof globalThis.ImageData === "undefined") {
//   (globalThis as any).ImageData = class ImageData {
//     constructor() {}
//   };
// }
// if (typeof globalThis.Path2D === "undefined") {
//   (globalThis as any).Path2D = class Path2D {
//     constructor() {}
//   };
// }

// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY,
// });

// const MAX_CHARS = 8000;

// async function extractTextFromPdf(buffer: Buffer): Promise<string> {
//   const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

//   // ✅ Point workerSrc to the worker file explicitly
//   pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/legacy/build/pdf.worker.mjs",
//     import.meta.url
//   ).toString();

//   const pdf = await pdfjsLib
//     .getDocument({
//       data: new Uint8Array(buffer),
//       useWorkerFetch: false,
//       isEvalSupported: false,
//       useSystemFonts: true,
//       disableFontFace: true,
//       verbosity: 0,
//       canvasFactory: {
//         create: (_w: number, _h: number) => ({ canvas: null, context: null }),
//         reset: () => {},
//         destroy: () => {},
//       },
//     } as any)
//     .promise;

//   let text = "";
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
//     text += content.items.map((item: any) => item.str).join(" ");
//     text += "\n";
//   }

//   return text;
// }

// async function extractText(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());

//   if (file.type === "text/plain") {
//     return buffer.toString("utf-8");
//   }

//   if (file.type === "application/pdf") {
//     return await extractTextFromPdf(buffer);
//   }

//   if (
//     file.type ===
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     const result = await mammoth.extractRawText({ buffer });
//     return result.value;
//   }

//   return "";
// }

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const file = formData.get("file") as File;
//     const question = formData.get("question") as string;

//     if (!file || !question) {
//       return NextResponse.json(
//         { error: "Missing file or question" },
//         { status: 400 }
//       );
//     }

//     const rawText = await extractText(file);
//     const text = rawText.length > MAX_CHARS ? rawText.slice(0, MAX_CHARS) : rawText;

//     const msg = await anthropic.messages.create({
//       model: "claude-haiku-4-5-20251001",
//       max_tokens: 300,
//       messages: [
//         {
//           role: "user",
//           content: `Document:\n${text}\n\nQuestion:\n${question}`,
//         },
//       ],
//     });

//     const answer =
//       msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")
//         ?.text ?? "No response";

//     return NextResponse.json({ answer });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { Buffer } from "buffer";

export const runtime = "nodejs";
export const maxDuration = 60;

if (typeof globalThis.DOMMatrix === "undefined") {
  (globalThis as any).DOMMatrix = class DOMMatrix { constructor() {} };
}
if (typeof globalThis.ImageData === "undefined") {
  (globalThis as any).ImageData = class ImageData { constructor() {} };
}
if (typeof globalThis.Path2D === "undefined") {
  (globalThis as any).Path2D = class Path2D { constructor() {} };
}

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

const MAX_CHARS = 8000;

// ✅ Supported image types by Claude API
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url
  ).toString();

  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
    disableFontFace: true,
    verbosity: 0,
    canvasFactory: {
      create: (_w: number, _h: number) => ({ canvas: null, context: null }),
      reset: () => {},
      destroy: () => {},
    },
  } as any).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }
  return text.trim();
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const question = formData.get("question") as string;

    if (!file || !question) {
      return NextResponse.json(
        { error: "Missing file or question" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let answer = "";

    // ✅ IMAGE — send as base64 vision input to Claude
    if (IMAGE_TYPES.includes(file.type)) {
      const base64 = buffer.toString("base64");
      const mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

      const msg = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: base64,
                },
              },
              {
                type: "text",
                text: question,
              },
            ],
          },
        ],
      });

      answer = msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "No response";

    // ✅ SCANNED PDF — no text layer, send as native PDF document to Claude
    } else if (file.type === "application/pdf") {
      const extractedText = await extractTextFromPdf(buffer);

      if (extractedText) {
        // Normal PDF with a text layer
        const text = extractedText.length > MAX_CHARS
          ? extractedText.slice(0, MAX_CHARS)
          : extractedText;

        const msg = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: `Document:\n${text}\n\nQuestion:\n${question}`,
            },
          ],
        });

        answer = msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "No response";

      } else {
        // Scanned PDF — send natively to Claude as a document
        const base64 = buffer.toString("base64");

        const msg = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: base64,
                  },
                } as any,
                {
                  type: "text",
                  text: question,
                },
              ],
            },
          ],
        });

        answer = msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "No response";
      }

    // ✅ DOCX
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.length > MAX_CHARS
        ? result.value.slice(0, MAX_CHARS)
        : result.value;

      const msg = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Document:\n${text}\n\nQuestion:\n${question}`,
          },
        ],
      });

      answer = msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "No response";

    // ✅ PLAIN TEXT
    } else if (file.type === "text/plain") {
      const text = buffer.toString("utf-8").slice(0, MAX_CHARS);

      const msg = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Document:\n${text}\n\nQuestion:\n${question}`,
          },
        ],
      });

      answer = msg.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "No response";

    } else {
      return NextResponse.json({
        answer: "Unsupported file type. Please upload a PDF, DOCX, TXT, JPG, or PNG.",
      });
    }

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}