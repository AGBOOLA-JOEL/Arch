"use client";
import { useInfo } from "@/_hooks/useInfo";
import { GiCheckMark } from "react-icons/gi";
import ArchSpinner from "./ArchSpinner";

const ArchUpgradeTable = () => {
  const { upgradeMutation } = useInfo();

  const handlePay = async (price: number) => {
    upgradeMutation.mutate(price);
    window.scrollTo(0, 0);
  };
  const tabledata = [
    {
      type: "PRICING",
      row1: "20,000 NGN",
      row2: "75,000 NGN",
      row3: "150,000 NGN",
    },
    {
      type: "Plan Duration",
      row1: "1 Month",
      row2: "6 Months",
      row3: "1 year/12 Months",
    },
    {
      type: "No of projects Downloadable",
      row1: "3 nos",
      row2: "10 nos",
      row3: "18 nos",
    },
    {
      type: "10% Commission on your submitted Premium Projects",
      row1: "-",
      row2: "-",
      row3: <GiCheckMark color="green" />,
    },
    {
      type: "Message Other Users",
      row1: <GiCheckMark color="green" />,
      row2: <GiCheckMark color="green" />,
      row3: <GiCheckMark color="green" />,
    },
    {
      type: "Portfolio Counts per Month",
      row1: "2 / Month",
      row2: "6 / Month",
      row3: "10 / Month",
    },

    {
      type: "Comics Counts per Week",
      row1: "2 / Week",
      row2: "4 / Week",
      row3: "5 / Month",
    },
  ];

  return (
    <>
      {!upgradeMutation.isPending ? (
        <div className="pay_table">
          <div className="pay_tabledesc">
            <h1>PREMIUM PROJECT DOWNLOAD PLANS</h1>
            <p>
              Subscribe to any of the premium plans below to have free access to
              download premium projects
            </p>
          </div>

          <div className="pay_tablecontainer">
            <table>
              <thead>
                <tr className="pay_tableheaders">
                  <th className="pay_tablehead">OFFERS</th>
                  <th className="pay_tablehead">SILVER</th>
                  <th className="pay_tablehead">GOLD</th>
                  <th className="pay_tablehead">PLATINUM</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.map((data) => {
                  if (data.type === "Comics Counts per Week") {
                    return (
                      <tr className="pay_tablecomic" key={data.type}>
                        <td className="pay_comichead">
                          <p>{data.type}</p>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row1}</span>
                            <button
                              onClick={() => handlePay(20000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row2}</span>
                            <button
                              onClick={() => handlePay(75000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row3}</span>
                            <button
                              onClick={() => handlePay(150000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr className="pay_tableothers" key={data.type}>
                        <td className="pay_tabledatahead">{data.type}</td>
                        <td className="pay_tabledata">{data.row1}</td>
                        <td className="pay_tabledata">{data.row2}</td>
                        <td className="pay_tabledata">{data.row3}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="pay_tablespinner">
          <ArchSpinner />
          <p>Initializing payment.....</p>
        </div>
      )}
    </>
  );
};

export default ArchUpgradeTable;
