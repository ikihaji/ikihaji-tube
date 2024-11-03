<!-- markdownlint-disable MD024 -->

# IkihajiTube 📺

IkihajiTube は、自身の YouTube の視聴履歴 (生き恥) を晒すことで友達との仲をより深めることができるアプリケーションです。

## Setup with Dev Containers 📦

IkihajiTube の開発環境を Dev Containers で簡単に立ち上げることができます。

### Attention

- 事前に [Docker](https://docs.docker.com/get-docker) と [Visual Studio Code](https://code.visualstudio.com) をインストールしておく必要があります。

### 1. clone git repository

```bash
git clone "https://github.com/ikihaji/ikihaji-tube" && cd "./ikihaji-tube"
```

### 2. set environment variables

`.env.example` ファイルをコピーして `.env` ファイルを作成し、環境変数を設定してください。  
環境変数の詳細は[リポジトリ所有者](https://github.com/dino3616)に連絡してください。

### 3. launch container

VSCodeの拡張機能 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) を使用してコンテナを起動してください。

### 4. install dependencies

```bash
bun install
```

### 5. start development server

```bash
bun turbo run dev
```

## Setup locally 🖥️

IkihajiTube の開発環境をローカルで立ち上げる場合は以下の手順に従ってください。

### Attention

- 事前に [proto](https://moonrepo.dev/docs/proto/install) をインストールしておく必要があります。
- [Optional] 事前に [`.devcontainer/devcontainer.json`](./.devcontainer/devcontainer.json#L8C7-L8C112) に記載されている拡張機能をインストールしておくことを推奨します。

### 1. clone git repository

```bash
git clone "https://github.com/ikihaji/ikihaji-tube" && cd "./ikihaji-tube"
```

### 2. set environment variables

`.env.example` ファイルをコピーして `.env` ファイルを作成し、環境変数を設定してください。  
環境変数の詳細は[リポジトリ所有者](https://github.com/dino3616)に連絡してください。

### 3. install package manager

```bash
proto use
```

### 4. install dependencies

```bash
bun install
```

### 5. start development server

```bash
bun turbo run dev
```
