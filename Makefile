BIN:=$(shell npm bin)

RESOURCE_FILES:=$(shell echo resource/*)

TARGET=all

all: Makefile index.js resources.js build/styles-packed.css
	mkdir -p  build
	$(BIN)/userscript-header-from-package-json > build/header.js
	$(BIN)/browserify index.js -t brfs -o build/bundle.js -d
	cp build/header.js build/LeanIn.user.js
	cat build/bundle.js >> build/LeanIn.user.js

build/styles-packed.css: styles.css Makefile
	mkdir -p  build
	$(BIN)/imageinliner -i styles.css -o build/styles-packed.css --rootPath . #--compress


