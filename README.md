# @zwkang-dev/simple-chatgpt-cli

> description:

simple way to use openai api in cli, just ask question and get answer

## Features

- [x] set local chatgpt api_key
- [x] simple way to ask chatgpt question
- [x] conversation mode

## Try it now Install

```bash
npm install @zwkang-dev/simple-chatgpt-cli

# or
# just usage

npx ask-chatgpt
```

## Usage

```bash

# set openai api_key
ask-chatgpt set <your_api_key>

# read openai api_key
ask-chatgpt read

# ask question
ask-chatgpt ask <your_question>

# conversation mode
ask-chatgpt conversation <your_question>
# or
ask-chatgpt co <your_question>

# clean conversation logger
ask-chatgpt conversation --reset
# or
ask-chatgpt co --reset

```

## Q&A

if you want to have more feature, please create issue to ask for

## LICENSE

[MIT](./LICENSE) License © 2022 [zwkang](https://github.com/zwkang)
