#!/bin/bash
NAME=$(echo $1 | awk -F"-" '{ print $1}')
VERSION=$(echo $1 | awk -F"-" '{ print $NF}' | awk -F".vsix" '{ print $1}')-$2
echo "## Uploading $1 with the version $VERSION ##"
cloudsmith push raw gap/vsce $NAME-$VERSION.vsix --version $VERSION --republish