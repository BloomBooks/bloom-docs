#!/bin/bash
# Wrapper script to run both download and convert with the same arguments

npx tsx ref-docs/download.ts "$@"
download_exit=$?

if [ "$download_exit" -ne 0 ]; then
  echo "Download phase failed (exit $download_exit); skipping conversion." >&2
  exit $download_exit
fi

echo
echo "--- Starting reference doc conversion ---"
echo "(loading tools can take a few seconds, please wait)"
echo
npx tsx ref-docs/convert.ts "$@"
convert_exit=$?
if [ "$convert_exit" -ne 0 ]; then
  echo "Conversion phase failed (exit $convert_exit)." >&2
  exit $convert_exit
fi

exit 0
