import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "notes.json");

interface Note {
  id: string;
  name: string;
  message: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
}

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const seed: Note[] = [
      {
        id: "seed-1",
        name: "Ping",
        message: "Welcome to my portfolio! Leave a note :)",
        color: "#FFE066",
        rotation: -2,
        x: 10,
        y: 8,
      },
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  }
}

function readNotes(): Note[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeNotes(notes: Note[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

export async function GET() {
  try {
    const notes = readNotes();
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, color, rotation, x, y } = body;

    if (
      !name ||
      !message ||
      typeof name !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (name.length > 30 || message.length > 120) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const notes = readNotes();
    const newNote: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      message: message.trim(),
      color: color || "#FFE066",
      rotation: rotation ?? 0,
      x: x ?? 10,
      y: y ?? 10,
    };

    notes.push(newNote);
    writeNotes(notes);

    return NextResponse.json(newNote, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const notes = readNotes();
    const filtered = notes.filter((n) => n.id !== id);
    writeNotes(filtered);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
