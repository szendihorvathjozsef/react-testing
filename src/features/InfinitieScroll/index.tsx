import * as React from "react";
import { useInfiniteQuery } from "react-query";
import { useVirtual } from "react-virtual";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";

import Link from "components/Router/Link";
import { getUsers } from "shared/network/user";
import { User } from "shared/types";

const InfiniteScroll = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    "test",
    async (key, nextId = 0) => {
      const { data } = await getUsers(nextId as number, 10);
      return data;
    },
    {
      getFetchMore: (lastGroup) => {
        const nextPage = lastGroup.info.page + 1;

        if (nextPage <= 3) {
          return nextPage;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const parentRef = React.useRef<HTMLDivElement>(null!);

  const flatPosts = data
    ? data.reduce((acc, val) => acc.concat(val.results), [] as User[])
    : [];

  const rowVirtualizer = useVirtual({
    size: canFetchMore ? flatPosts.length + 1 : flatPosts.length,
    parentRef,
    estimateSize: React.useCallback(() => 100, []),
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index === flatPosts.length - 1 &&
      canFetchMore &&
      !isFetchingMore
    ) {
      fetchMore();
    }
  }, [
    canFetchMore,
    fetchMore,
    flatPosts.length,
    isFetchingMore,
    rowVirtualizer.virtualItems,
  ]);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Infinite Loading
      </Typography>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {(error as any).message}</span>
      ) : (
        <div
          ref={parentRef}
          style={{
            height: `500px`,
            width: `100%`,
            overflow: "auto",
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.totalSize}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.virtualItems.map((virtualRow) => {
              const isLoaderRow = virtualRow.index > flatPosts.length - 1;
              const user = flatPosts[virtualRow.index];
              console.log(isLoaderRow);
              return (
                <div
                  key={virtualRow.index}
                  className={
                    virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    canFetchMore ? (
                      "Loading more..."
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    <Box
                      border={1}
                      borderColor="secondary.light"
                      mb={1}
                      p={2}
                      borderRadius={20}
                      display="grid"
                      gridTemplateColumns="repeat(auto-fit, minmax(40px, 1fr))"
                      alignItems="center"
                    >
                      <Avatar
                        src={user.picture.thumbnail}
                        alt={user.name.last + " " + user.name.first}
                      />
                      <Typography variant="h6" align="left">
                        {user.name.last + " " + user.name.first}
                      </Typography>
                      <IconButton
                        component={Link}
                        to="/infinite-scroll/profile"
                      >
                        <ChevronRightRoundedIcon />
                      </IconButton>
                    </Box>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        {isFetching && !isFetchingMore ? "Background Updating..." : null}
      </div>
    </div>
  );
};

export default InfiniteScroll;
