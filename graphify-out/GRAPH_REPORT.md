# Graph Report - scouts-sa  (2026-11-23)

## Corpus Check
- 4 files · ~5,917 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .toml 1)

## Summary
- 13 nodes · 17 edges · 2 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bf9930cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- _db.mjs
- package.json

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 3 edges
2. `headers` - 3 edges
3. `@neondatabase/serverless` - 3 edges
4. `@neondatabase/serverless@^0.9.0` - 2 edges
5. `config` - 1 edges
6. `config` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (2 total, 0 thin omitted)

### Community 0 - "_db.mjs"
Cohesion: 0.48
Nodes (4): getDb(), headers, config, config

### Community 1 - "package.json"
Cohesion: 0.40
Nodes (5): dependencies, @neondatabase/serverless@^0.9.0, name, version, @neondatabase/serverless

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@neondatabase/serverless` connect `package.json` to `_db.mjs`?**
  _High betweenness centrality (0.553) - this node is a cross-community bridge._