def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """
    last_element = None

    if len(lst) > 0:
        last_element = lst[-1]
    
    return last_element
