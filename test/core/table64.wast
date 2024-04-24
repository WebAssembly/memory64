;; Test table section structure
;; Largely duplicated from table.wast, but with all tables using a 64-bit index.

(module (table i64 0 funcref))
(module (table i64 1 funcref))
(module (table i64 0 0 funcref))
(module (table i64 0 1 funcref))
(module (table i64 1 256 funcref))
(module (table i64 0 65536 funcref))
(module (table i64 0 0xffff_ffff funcref))

(module (table i64 0 funcref) (table i64 0 funcref))
(module (table (import "spectest" "table64") i64 0 funcref) (table i64 0 funcref))

(assert_invalid (module (elem (i32.const 0))) "unknown table")
(assert_invalid (module (elem (i32.const 0) $f) (func $f)) "unknown table")


(assert_invalid
  (module (table i64 1 0 funcref))
  "size minimum must not be greater than maximum"
)
(assert_invalid
  (module (table i64 0xffff_ffff 0 funcref))
  "size minimum must not be greater than maximum"
)
