interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  filter?: Record<string, any>;
}

export async function usePagination<ModelType>(
  model: any,
  options: PaginateOptions = {}
) {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {},
  } = options;

  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    model.find(filter).sort(sort).skip(skip).limit(limit),
    model.countDocuments(filter),
  ]);

  return {
    results,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}
