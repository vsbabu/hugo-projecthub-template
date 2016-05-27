TARGET_RSYNC_LOC=/var/www/html/kickass/
echo "### Preparing search index and rebuilding site"
rm -f public/site-index.json
hugo
#cp -f public/json/index.html public/site-index.json
## this helps in minifying
cat public/search/index.html|python -c "import sys,json;print json.dumps(json.loads(sys.stdin.read()), separators=(',',':'))" > public/site-index.json
echo "### Compacted index"
ls -alh public/search/index.html public/site-index.json
if [ $# -ge 1 ]; then
  echo "### Dev mode"
  cp -f public/site-index.json static/
  killall hugo
  hugo server
else
  echo "### Syncing"
  rsync --quiet --progress --recursive --delete public/ $TARGET_RSYNC_LOC
fi

