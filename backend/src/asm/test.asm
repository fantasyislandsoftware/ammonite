.section code

test:   move.w d0,2(a0)
        bra test

.section data
        dc.b 255