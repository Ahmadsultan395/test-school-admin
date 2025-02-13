import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useDeeplink = () => {
  const router = useRouter();

  useEffect(() => {
    async function handleDeeplink() {
      const BranchSDK = (await import("branch-sdk")).default;
      BranchSDK.init("key_live_dzpAFQMOve9uIIsCfDO1pachrqjOnh2d");
      BranchSDK.data(function (err, data) {
        if (err) {
          console.warn(`Branch failed to resolve link: ${err}`);
          return;
        }
        if (
          data &&
          data?.data_parsed &&
          "~feature" in data.data_parsed &&
          "school_id" in data.data_parsed
        ) {
          console.log("data", data);
          const path: any = data?.data_parsed["~feature"];
          const school_id: any = data?.data_parsed["school_id"];
          console.log("path", path);
          console.log("school_id", school_id);
          handleNavigation(path.toString());
          localStorage.setItem('school_id', JSON.stringify(school_id))
        }
      });
    }
    handleDeeplink();
  }, [router]);

  const handleNavigation = (path: string) => {
    if (path) {
      router.push(path);
    }
  };
};

export default useDeeplink;
