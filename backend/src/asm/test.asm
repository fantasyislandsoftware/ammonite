.section code

test:   move.b d0,(a5)
        bra test

.section data
        dc.b 255