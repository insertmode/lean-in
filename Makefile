all:
	mkdir -p  build
	$(shell npm bin)/userscript-header-from-package-json > build/header.js
