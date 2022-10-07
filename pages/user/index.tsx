import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "@pages/_app";
import { Pagination, UrlQueries } from "@models/generic";
import MainLayout from "@components/layouts/MainLayout";
import TitleComponent from "@components/generic/TitleComponent";
import PaginationComponent from "@components/generic/PaginationComponent";
import TextFilterComponent from "@components/generic/filters/TextFilterComponent";
import { Contributor } from "@models/user";
import UserService from "@services/UserService";
import ContributorCard from "@components/users/ContributorCard";

interface UserIndex {
  contributors: Contributor[];
  pagination: Pagination;
}

const UserIndex: NextPageWithLayout<UserIndex> = ({ contributors, pagination }) => {
  return (
    <>
      <Head>
        <title>User List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="User list" />
        <div className="flex mb-10 gap-5">
          <TextFilterComponent placeholder="Username..." filterUrl="user__username__icontains" />
        </div>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6
                     gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-8 md:gap-y-10 lg:gap-y-12"
        >
          {contributors.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))}
        </div>
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default UserIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
  const { object_count, page_count, next, previous, results: contributors } = await UserService.getContributorList({ ...query, size: 16 });

  return {
    props: {
      contributors,
      pagination: {
        object_count,
        page_count,
        next,
        previous,
      },
    },
  };
};

UserIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;