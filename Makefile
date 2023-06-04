.PHONY: install
install:
	yarn --cwd=./ui install
	yarn --cwd=./server/nodejs install

.PHONY: start-example
start-example:
	yarn --cwd=./ui/sites/example-app start

.PHONY: start-server
start-server:
	yarn --cwd=./server/nodejs start

.PHONY: reload-editor-package
reload-editor-package:
	yarn --cwd=./ui/packages/editor-for-google-platform-ui build

# .PHONY: watch-reload-editor-package
# watch-reload-editor-package:
# 	npx nodemon --delay 5 --watch ./ui/packages/editor-for-google-platform-ui --ignore ./ui/packages/editor-for-google-platform-ui/dist --exec "yarn --cwd=./ui/packages/editor-for-google-platform-ui build"

# .PHONY: start
# start:
# 	npx concurrently \
# 		"yarn --cwd=./ui/sites/example-app start" \
# 		"yarn --cwd=./server/nodejs start" 
# 		"npx nodemon --delay 5 --watch ./ui/packages/editor-for-google-platform-ui --ignore ./ui/packages/editor-for-google-platform-ui/dist --exec \"yarn --cwd=./ui/packages/editor-for-google-platform-ui build\""