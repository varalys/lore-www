---
title: Encryption
description: How Lore Cloud protects your session data with end-to-end encryption
---

Lore Cloud uses end-to-end encryption to ensure that only you can read your session content. The server never sees your unencrypted data.

## How It Works

```
Your passphrase
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Argon2id   │────▶│  256-bit Key │────▶│   AES-GCM    │
│  (with salt) │     │              │     │  Encryption  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          Encrypted blob
                                          (stored in cloud)
```

1. **Key Derivation**: Your passphrase is combined with a random salt using Argon2id to derive a 256-bit encryption key
2. **Encryption**: Session messages are encrypted with AES-256-GCM before upload
3. **Storage**: Only encrypted blobs are stored on the server
4. **Decryption**: On pull, encrypted data is decrypted locally with your key

## Cryptographic Primitives

| Component | Algorithm | Purpose |
|-----------|-----------|---------|
| Key Derivation | Argon2id | Derives encryption key from passphrase |
| Symmetric Encryption | AES-256-GCM | Encrypts session content |
| Nonce | 96-bit random | Ensures unique ciphertext per encryption |
| Salt | 128-bit random | Makes key derivation unique per account |

### Why Argon2id?

Argon2id is the winner of the Password Hashing Competition and is designed to be:

- **Memory-hard**: Resists GPU/ASIC attacks
- **Time-hard**: Configurable computation cost
- **Side-channel resistant**: Combines Argon2i and Argon2d

### Why AES-256-GCM?

AES-256-GCM provides:

- **Authenticated encryption**: Detects tampering
- **256-bit security**: Quantum-resistant key size
- **Hardware acceleration**: Fast on modern CPUs

## What's Encrypted

| Data | Encrypted? | Notes |
|------|------------|-------|
| Session messages | Yes | Full conversation content |
| Tool calls/results | Yes | Part of messages |
| Session metadata | No | Tool name, timestamps, project path |
| Email | No | Account identifier |

Metadata is stored unencrypted to enable:
- Browsing sessions in the web dashboard
- Filtering by date range
- Searching by project

## Salt Management

The salt is a random value generated on first push and stored:

1. **Locally**: In your [configuration file](/reference/configuration)
2. **Cloud**: Associated with your account

When setting up a new machine, the CLI fetches the salt from the cloud to derive the same key from your passphrase.

:::caution[Same Passphrase Required]
All your machines must use the same passphrase. There's no passphrase recovery — if you forget it, you cannot decrypt your sessions.
:::

## Key Storage

After entering your passphrase, the derived key is cached locally (not the passphrase itself):

- **OS Keychain**: macOS Keychain, Windows Credential Manager, or Linux Secret Service
- **File storage**: Encrypted file in `~/.lore/`

The key remains cached until you run `lore logout`, which deletes both credentials and encryption keys.

## Security Model

### What We Cannot Do

- Read your session content
- Decrypt your data without your passphrase
- Recover your passphrase if lost

### What We Can See

- Session metadata (timestamps, tool name, project path)
- Storage usage
- Sync timestamps

### Trust Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                      YOUR DEVICE                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Plaintext   │───▶│ Encryption  │───▶│ Ciphertext  │      │
│  │ Sessions    │    │   (local)   │    │   (blob)    │──────┼──▶ Cloud
│  └─────────────┘    └─────────────┘    └─────────────┘      │
│        ▲                                      │             │
│        └──────────────────────────────────────┘             │
│                    Decryption (local)                       │
└─────────────────────────────────────────────────────────────┘
```

Encryption and decryption happen entirely on your device. The server only handles encrypted blobs.

## Limitations

### No Server-Side Search

Because content is encrypted, we cannot search message text on the server. Search in the web dashboard uses metadata only.

### Passphrase Recovery

There is no "forgot passphrase" flow. The server has no way to decrypt your data or verify your passphrase.

### Large Sessions

Encryption adds ~28 bytes overhead per session (nonce + auth tag). This is negligible for typical sessions but contributes to size limits on very large sessions.

## Best Practices

1. **Use a strong passphrase** — At least 8 characters, mix of letters/numbers/symbols
2. **Store your passphrase securely** — Use a password manager
3. **Same passphrase everywhere** — All your machines need the same passphrase
4. **Don't share your passphrase** — It's the only thing protecting your sessions

## Technical Details

### Encrypted Data Format

```
┌──────────────┬──────────────────────────────────────────┐
│   Nonce      │             Ciphertext + Tag             │
│  (12 bytes)  │            (variable length)             │
└──────────────┴──────────────────────────────────────────┘
```

- **Nonce**: Random 96-bit value, unique per encryption
- **Ciphertext**: Encrypted session messages (JSON)
- **Tag**: 128-bit authentication tag (appended by AES-GCM)

### Message Serialization

Before encryption, session messages are serialized to JSON, including:

- Message role (user/assistant/system)
- Message content (text, tool calls, tool results)
- Timestamps
- Model information

## Next Steps

- [Authentication](/cloud/authentication) — Set up your account
- [Pushing & Pulling](/cloud/sync) — Start syncing sessions
