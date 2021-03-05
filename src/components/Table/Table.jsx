import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../../server/firebase";
import "./table.scss";
import { SORT_BY, SORT_TYPE, compare } from "../../utils";
import { Loader } from "../Loader";
import { Pagination } from "./Pagination";

const TableArrow = ({ sortType = SORT_TYPE.ASC, isShow = true }) => {
  if (!isShow) return null;
  return sortType === SORT_TYPE.DESC ? "⬇️" : "⬆️";
};

export const Table = () => {
  const [emailsWithDocIDs, setEmailsWithDocIds] = useState([]);
  const [emailsProviders, setEmailsProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    sortBy: SORT_BY.DATE,
    sortType: SORT_TYPE.DESC,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(10);

  const getEmailsWithIds = async () => {
    const subscribersDb = await db.collection("subscribers").get();
    const allEmailsWithDocIds = subscribersDb.docs.map((doc) => {
      const allDoc = doc.data();
      return {
        ...allDoc,
        id: doc.id,
        createdAt: allDoc.createdAt.seconds,
      };
    });
    const initialEmails = compare(
      allEmailsWithDocIds,
      sort.sortBy,
      sort.sortType
    );
    setEmailsWithDocIds(initialEmails);
  };

  const getEmailsProviders = async () => {
    try {
      const subscribersDb = await db.collection("subscribers").get();
      const data = subscribersDb.docs.map((doc) => doc.data());
      const allEmails = data.map(({ email }) => {
        return email.match(/([@-Z])\w+/)[0];
      });
      const uniqueProviders = new Set(allEmails);
      const providers = Array.from(uniqueProviders);
      setEmailsProviders(providers);
    } catch (error) {
      console.error(
        `Something went wrong, please reload page. Error - ${error}`
      );
    }
  };

  const deleteEmail = async (id) => {
    try {
      await db.collection("subscribers").doc(`${id}`).delete();
    } catch (error) {
      console.error(
        `Something went wrong, please reload page. Error - ${error}`
      );
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sorting = (sortBy) => {
    const newSortType =
      sort.sortType === SORT_TYPE.DESC ? SORT_TYPE.ASC : SORT_TYPE.DESC;

    setSort({ sortType: newSortType, sortBy });

    const filteredArray = [
      ...compare(emailsWithDocIDs, sort.sortBy, newSortType),
    ];
    setEmailsWithDocIds(filteredArray);
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emailsWithDocIDs.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );

  const valuesOfEmails = Object.values(emailsWithDocIDs);

  useEffect(() => {
    getEmailsWithIds().then(() => setLoading(false));
  }, [valuesOfEmails]);

  useEffect(() => {
    getEmailsProviders().then(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="Loader">
      <Loader />
    </div>
  ) : (
    <div className="Table">
      <div className="Table__inputs">
        <div className="Table__inputs_wrapper">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="Table__inputs_buttons">
            {emailsProviders.map((email) => {
              return (
                <button key={email} onClick={() => setSearch(email)}>
                  {email}
                </button>
              );
            })}
            <button onClick={() => setSearch("")}>Clear</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => sorting(SORT_BY.EMAIL)}>
                <TableArrow
                  sortType={sort.sortType}
                  isShow={sort.sortBy === SORT_BY.EMAIL}
                />
                Emails
              </button>
            </th>
            <th>
              <button onClick={() => sorting(SORT_BY.DATE)}>
                <TableArrow
                  sortType={sort.sortType}
                  isShow={sort.sortBy === SORT_BY.DATE}
                />
                Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmails
            .filter((value) => {
              const email = value.email;
              if (search === "") {
                return email;
              } else if (email.toLowerCase().includes(search.toLowerCase())) {
                return email;
              }
              return null;
            })
            .map((value) => {
              return (
                <tr key={value.id}>
                  <td>{value.email}</td>
                  <td className="td-date">
                    {moment(value.createdAt * 1000).format("DD MMM YYYY HH:MM")}
                    <button
                      className="deleteButton"
                      onClick={() => deleteEmail(value.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        emails={emailsWithDocIDs.length}
        emailsPerPage={emailsPerPage}
        paginate={paginate}
      />
    </div>
  );
};
