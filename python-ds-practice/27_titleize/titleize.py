def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    words = phrase.split()
    out = ""

    for word in words:
        out += word.lower().capitalize() + " "
    
    return out
    