FULL_NAME="Lars Roth"
GITHUB_USER="Supporterino"
REPO_NAME="alertmanager-api-v2"
sed -i.mybak "s/ryansonshine/$GITHUB_USER/g; s/typescript-npm-package-template\|my-package-name/$REPO_NAME/g; s/Ryan Sonshine/$FULL_NAME/g" package.json package-lock.json README.md
rm *.mybak
