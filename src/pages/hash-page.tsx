import Head from "next/head";
import React from "react";

const HashPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Hash Page</title>
      </Head>
      <div className=" w-full max-w-md p-8">
        <p className="text-lg">
          ハッシュの表示：「&#35;」<br />
          （HTMLエンティティ）
        </p>
        <br />
        <p className="text-lg" style={{ color: "#ff0000" }}>
            ハッシュの表示：「&#35;」<br />
            （HTMLエンティティ・スタイルにハッシュ）
        </p>
        <br />
        <p className="text-lg">
          ハッシュの表示：「#」
        </p>
      </div>
    </div>
  );
};

export default HashPage;