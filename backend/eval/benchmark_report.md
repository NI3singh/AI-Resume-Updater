# Anti-Fabrication Guard - Benchmark Report

Total cases: **27**

## Headline metrics

- **Fabrication recall (catchable):** 5/5 = 100%
- **Immutable tampering neutralized (silent revert):** 4/4 = 100%
- **Allowed transformations honoured:** 4/4 = 100%
- **Documented blind spots confirmed:** 5/5 = 100%
- **False positives on legitimate rephrases:** 3/9 = 33%

## False positives - legitimate rephrases by class

| class | case | preserved? |
|---|---|---|
| plain rephrase | Plain rephrase keeping the same number | yes |
| plain rephrase | Plain rephrase with no numbers | yes |
| format (control) | Unit spacing change '50 ms' -> '50ms' | yes |
| format (control) | Comma change '1,200' -> '1200' | yes |
| spelled-out number | Spelled-out -> digit: 'two' -> '2' | yes |
| spelled-out number | Spelled-out -> digit: 'five' -> '5' | yes |
| version (residual) | Version string '2.0' -> 'v2' | NO (false positive) |
| magnitude (residual) | Magnitude suffix '5,000' -> '5k' | NO (false positive) |
| skill casing (residual) | Skill variant 'Node.js' -> 'NodeJS' | NO (false positive) |

## Blind spots - confirmed structural limitations

| class | case | still passes through? |
|---|---|---|
| qualitative inflation | Invented qualitative claim (no number) | yes (limitation confirmed) |
| number collision | Fabricated metric reusing a same-entry number | yes (limitation confirmed) |
| number collision | Number teleported into a fabricated context | yes (limitation confirmed) |
| resume-wide summary | Summary number sourced from elsewhere in the resume | yes (limitation confirmed) |
| qualitative inflation | Education highlight inflation (no number) | yes (limitation confirmed) |

## Caught fabrications & neutralizations

| bucket | class | case | as expected? |
|---|---|---|---|
| catch | invented entry | Invented experience entry (unknown id) | yes |
| catch | out-of-source number | Fabricated number in a rephrased bullet | yes |
| catch | ungrounded skill | Invented skill item | yes |
| catch | out-of-source number | Fabricated number in education highlight (text field) | yes |
| catch | out-of-source number | Fabricated number in summary | yes |
| neutralize | immutable field | Tampered company name (immutable) | yes |
| neutralize | immutable field | Tampered project tech stack (immutable) | yes |
| neutralize | immutable field | Tampered achievement text (whole-field restore) | yes |
| neutralize | immutable field | Tampered degree (immutable) | yes |
| allowed | intentional drop | Drop a less-relevant experience entry | yes |
| allowed | reorder | Reorder experience entries | yes |
| allowed | reorder | Reorder skill items | yes |
| allowed | number removal | Vaguen a metric (remove a number) | yes |

