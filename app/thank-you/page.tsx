import React from "react";
import Image from "next/image";

const supervisors = [
  {
    id: 1,
    name: "Dr. Marica Cassarino",
    imageUrl:
      "https://iris.ucc.ie/live/w_rms_blob_common.download_photo?pObjectId=241511290",
  },
  {
    id: 2,
    name: "Dr. Roberto Cibin",
    imageUrl:
      "https://iris.ucc.ie/live/w_rms_blob_common.download_photo?pObjectId=542533291",
  },
  {
    id: 3,
    name: "Dr. Laura Maye",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1612485581866504193/IwtebnZc_400x400.jpg",
  },
];

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center mt-8">
        Thank you to our supervisors!
      </h1>
      <div className="flex flex-row items-center justify-center">
        {supervisors.map((supervisor) => (
          <div key={supervisor.id} className="mx-4">
            <Image
              src={supervisor.imageUrl}
              alt={supervisor.name}
              width={250}
              height={100}
              className="rounded-full"
            />
            <p className="text-center text-lg font-bold mt-4 justify-center">
              {supervisor.name}
            </p>
          </div>
        ))}
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      </div>
      {/*  it should take up a full height of the screen and be centered and justified vertically */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl text-center">Questions?</h1>
      </div>
    </div>
  );
};

export default ThankYouPage;
