# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.corepack
    pkgs.typescript
    pkgs.chromium
  ];

  # Sets environment variables in the workspace
  env = {};
  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx = {
    extensions = [
      "aaron-bond.better-comments"
      "bierner.emojisense"
      "bierner.markdown-preview-github-styles"
      "christian-kohler.npm-intellisense"
      "christian-kohler.path-intellisense"
      "codezombiech.gitignore"
      "ctcuff.font-preview"
      "dbaeumer.vscode-eslint"
      "eamodio.gitlens"
      "EditorConfig.EditorConfig"
      "esbenp.prettier-vscode"
      "github.vscode-github-actions"
      "hoovercj.vscode-power-mode"
      "humao.rest-client"
      "jock.svg"
      "LaurentTreguier.vscode-simple-icons"
      "miguelsolorio.fluent-icons"
      "mrmlnc.vscode-duplicate"
      "ms-vscode.js-debug"
      "ms-vscode.vscode-typescript-next"
      "oouo-diogo-perdigao.docthis"
      "pflannery.vscode-versionlens"
      "PKief.material-icon-theme"
      "Tobermory.es6-string-html"
      "usernamehw.errorlens"
      "wix.vscode-import-cost"
      "xabikos.JavaScriptSnippets"
      "YoavBls.pretty-ts-errors"
      "yzhang.markdown-all-in-one"
      "zhuangtongfa.material-theme"
      "castrogusttavo.symbols"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        # Example: run "npm run dev" with PORT set to IDX's defined port for previews, and show it in IDX's web preview panel
        #  command = ["pnpm" "run" "dev:watch"];
        #  manager = "web";
        #  env = { #Environment variables to set for your server
        #    PORT = "$PORT";
        #  };
        #};
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}