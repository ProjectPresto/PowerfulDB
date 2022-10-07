import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "@pages/_app";
import { Contributor } from "@models/user";
import UserService from "@services/UserService";
import MainLayout from "@components/layouts/MainLayout";
import ViewContributorCard from "@components/users/viewPage/ViewContributorCard";
import ContributionList from "@components/users/viewPage/ContributionList";

interface ContributorView {
  contributor: Contributor;
}

const ContributorView: NextPageWithLayout<ContributorView> = ({ contributor }) => {
  console.log(contributor);

  return (
    <>
      <Head>
        <title>{contributor.username} Profile | PowerfulDB</title>
      </Head>
      <div
        className="pt-6 xl:pt-10 pb-28 px-6 lg:px-10 xl:px-12 2xl:px-16
      relative flex xl:flex-row flex-col gap-y-8 lg:gap-x-8 xl:gap-x-12 2xl:gap-x-16"
      >
        <ViewContributorCard contributor={contributor} />
        <ContributionList contributor={contributor} />
      </div>
    </>
  );
};

export default ContributorView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  let contributor;
  try {
    contributor = await UserService.getContributor(parseInt(id as string));
  } catch (ex) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      contributor,
    },
  };
};

ContributorView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
