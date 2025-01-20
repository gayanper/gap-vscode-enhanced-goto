#!/bin/bash
NAME=$(echo $1 | rev | cut -d'-' -f2- | rev)
VERSION=$(echo $1 | awk -F"-" '{ print $NF}' | awk -F".vsix" '{ print $1}')-$2
echo "## Uploading $1 with the version $VERSION ##"

PKG_NAME=$NAME-$VERSION.vsix
mv $1 $PKG_NAME
cloudsmith push raw gap/vsce $PKG_NAME --version $VERSION --republish