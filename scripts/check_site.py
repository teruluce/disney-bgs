#!/usr/bin/env python3
"""Run the dependency-free checks needed before publishing a site change."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
COMMANDS = (
    [sys.executable, "scripts/seo_audit.py"],
    [sys.executable, "scripts/update_share_links.py", "--check"],
    [sys.executable, "scripts/check_archive.py"],
    [sys.executable, "-m", "unittest", "discover", "-s", "scripts", "-p", "test_*.py"],
    ["node", "--check", "site.js"],
)


def main():
    failed = []
    for command in COMMANDS:
        print("+", " ".join(command), flush=True)
        if subprocess.run(command, cwd=ROOT, check=False).returncode:
            failed.append(" ".join(command))
    if failed:
        print("Failed checks:", ", ".join(failed))
        return 1
    print("All site checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
