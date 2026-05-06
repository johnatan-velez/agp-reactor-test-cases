# AGP Reactor Test Cases (GUIDE-2195)

Test scenarios for verifying deeply-nested Maven reactor support in AGP validation.

## Test Cases

### TC1: Three-level reactor
Verifies AGP targets the **topmost** reactor root (grandparent), not the intermediate parent.

```
tc1/
├── pom.xml                    ← grandparent (modules: [parent])
└── parent/
    ├── pom.xml                ← parent (modules: [child])
    └── child/
        ├── pom.xml            ← leaf module, depends on commons-lang3:3.12.0
        └── src/main/java/...
```

### TC2: Orphan module
Verifies AGP falls back to standalone `mvn verify` when the module is not in any reactor.

```
tc2/
├── pom.xml                    ← reactor root (modules: [parent] — does NOT list orphan)
├── parent/
│   └── pom.xml
└── orphan/
    ├── pom.xml                ← NOT listed in any <modules>
    └── src/main/java/...
```

### TC3: Four-level hierarchy with unrelated topmost
Verifies AGP skips a topmost reactor that doesn't transitively include the module.

```
tc3/great-grandparent/
├── pom.xml                                 ← lists "unrelated-module" only (NOT grandparent)
└── grandparent/
    ├── pom.xml                             ← lists "parent" ← correct reactor root
    └── parent/
        ├── pom.xml                         ← lists "child"
        └── child/
            ├── pom.xml                     ← depends on commons-text:1.9
            └── src/main/java/...
```

## Usage

```bash
cd <seaworthy>/agentic-patches-ts
bun install
export AGP_DIR=$(pwd)

# Run the helper script against any module dir:
bun run <this-repo>/print-validation-cmd.ts "$AGP_DIR" <module-dir>
```
