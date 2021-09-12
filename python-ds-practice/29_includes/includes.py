def includes(collection, sought, start=None):
    """Is sought in collection, starting at index start?

    Return True/False if sought is in the given collection:
    - lists/strings/sets/tuples: returns True/False if sought present
    - dictionaries: return True/False if *value* of sought in dictionary

    If string/list/tuple and `start` is provided, starts searching only at that
    index. This `start` is ignored for sets/dictionaries, since they aren't
    ordered.

        >>> includes([1, 2, 3], 1)
        True

        >>> includes([1, 2, 3], 1, 2)
        False

        >>> includes("hello", "o")
        True

        >>> includes(('Elmo', 5, 'red'), 'red', 1)
        True

        >>> includes({1, 2, 3}, 1)
        True

        >>> includes({1, 2, 3}, 1, 3)  # "start" ignored for sets!
        True

        >>> includes({"apple": "red", "berry": "blue"}, "blue")
        True
    """
    out = False

    if isinstance(collection, tuple) or isinstance(collection, str) or isinstance(collection, list):
        if start == None:
            start = 0

        coll_set = set( [ collection[i] for i in range(start, len(collection)) ] )

        out = sought in coll_set
    elif isinstance(collection, set):
        coll_set = collection

        out = sought in coll_set
    elif isinstance(collection, dict):
        coll_set = set(collection.values())

        out = sought in coll_set
    
    return out