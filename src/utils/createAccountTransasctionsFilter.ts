function createAccountTransasctionsFilter(
  address: string,
  type: 'from' | 'to' | 'self' | 'all'
) {
  switch (type) {
    case 'from':
      return {
        from: {
          $eq: address,
        },
      };
    case 'to':
      return {
        $and: [
          {
            to: {
              $eq: address,
            },
          },
          {
            from: {
              $ne: address,
            },
          },
        ],
      };
    case 'self':
      return {
        $and: [
          {
            to: {
              $eq: address,
            },
          },
          {
            from: {
              $eq: address,
            },
          },
        ],
      };
    case 'all':
    default:
      return {
        $or: [
          {
            from: {
              $contains: address,
            },
          },
          {
            to: {
              $contains: address,
            },
          },
        ],
      };
  }
}

export default createAccountTransasctionsFilter;
