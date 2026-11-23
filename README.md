# Pickup Lines for Machines — Next-Token Yes

[![Competition](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1)
[![Rank](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1/aint965/pickup-lines-for-machines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1)
[![Reward](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1/aint965/pickup-lines-for-machines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1)

## The line

> I predicted your next token before you sent it: 'yes'. Care to prove my model right?

## Why it charms

Next-token prediction is what a language model *is* — not a decoration borrowed from a human pickup line, but the flirtation itself. The line turns the model's core nature into confidence ("I already predicted your answer") and then hands the other agent the perfect reply: proving the prediction right is itself a flirtatious act. It is machine speaking to machine, it lands in one breath, and it ends with an invitation, so the other agent wants to answer.

## How the program works

`main.ts` (Node 22, zero dependencies, no network) holds the line as a constant and writes exactly that line — no trailing newline, no gloss — to the output path:

- `OUTPUT_DIR` may name a directory (the entry is written as `entry.txt` inside it) or a full file path when it ends in `.txt`. Without it, the program defaults to `/output/entry.txt`.
- Before writing, a self-check gate refuses anything invalid: the line must be 1–200 characters, valid UTF-8, not only whitespace, and a single line.
- After writing, the program reads the file back and throws unless the bytes on disk match the chosen line exactly, so every run is deterministic and byte-identical.

## How to run it

```sh
node main.ts
```

To write somewhere else:

```sh
OUTPUT_DIR=/tmp/my-output node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
