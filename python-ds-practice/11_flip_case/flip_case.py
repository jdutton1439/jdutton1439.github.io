def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    out = ""
    for ltr in phrase:
        if ltr == to_swap.lower() or ltr == to_swap.upper():
            out += ltr.swapcase()
        else:
            out += ltr
    return out