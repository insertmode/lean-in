BIN:=$(shell npm bin)

all:
	mkdir -p  build
	$(BIN)/userscript-header-from-package-json > build/header.js
	$(BIN)/browserify index.js -o build/bundle.js
	cp build/header.js build/LeanIn.user.js
	cat build/bundle.js >> build/LeanIn.user.js

