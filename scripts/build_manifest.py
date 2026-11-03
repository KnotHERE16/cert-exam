from pathlib import Path

CERTS = Path(__file__).resolve().parent.parent / "certs"


def main():
    ids = sorted(p.parent.name for p in CERTS.glob("*/bank.js"))
    body = ",\n".join(f'  "{i}"' for i in ids)
    (CERTS / "manifest.js").write_text(f"window.CERT_FOLDERS = [\n{body}\n];\n", encoding="utf-8")
    print(f"{len(ids)} certs: {', '.join(ids)}")


if __name__ == "__main__":
    main()
