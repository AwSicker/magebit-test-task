import React from "react";
import "./pagination.scss";

export const Pagination = ({ emailsPerPage, emails, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(emails / emailsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="Pagination">
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <a
                className="Pagination__number"
                onClick={() => paginate(number)}
                href="#"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
