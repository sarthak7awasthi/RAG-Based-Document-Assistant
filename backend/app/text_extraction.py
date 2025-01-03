from PyPDF2 import PdfReader
from docx import Document
import re

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file."""
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error extracting text from PDF: {e}")

def extract_text_from_docx(file_path):
    """Extract text from a DOCX file."""
    try:
        doc = Document(file_path)
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs)
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error extracting text from DOCX: {e}")

def extract_text_from_txt(file_path):
    """Extract text from a TXT file."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error reading text from TXT: {e}")




def preprocess_text(text):
    """Clean and preprocess the text."""
    # Normalize spaces and remove unwanted characters
    text = re.sub(r"\s+", " ", text)  # Replace multiple spaces with a single space
    text = re.sub(r"[^\x00-\x7F]+", " ", text)  # Remove non-ASCII characters
    return text.strip()

def chunk_text(text, chunk_size=500):
    """
    Split text into chunks of specified size.
    Args:
        text (str): The text to split.
        chunk_size (int): Number of words per chunk.
    Returns:
        List[str]: List of text chunks.
    """
    words = text.split()
    chunks = [
        " ".join(words[i : i + chunk_size]) for i in range(0, len(words), chunk_size)
    ]
    return chunks
