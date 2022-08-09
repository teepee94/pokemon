import React from 'react'
import ArrowLeftIcon from '../../resources/icons/ArrowLeftIcon'
import ArrowRightIcon from '../../resources/icons/ArrowRightIcon'
import "../../resources/sass/components/_components.pagination.scss"

function Pagination(c) {
    return (
        <nav className={`c-pagination ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <span className="u-visually-hide" id="label-pagination">Pagination</span>
                    <div className="c-pagination__container" aria-labelledby="label-pagination">
                        <ol className="c-pagination__items">
                            <li className="c-pagination__item c-pagination__item--prev">
                                <a href="" className="c-pagination__link">
                                    <ArrowLeftIcon />
                                    <span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Previous </span><span className="u-visually-hide">page</span>
                                </a>
                            </li>
                            <li className="c-pagination__item"><a href="" className="c-pagination__link is-current"><span className="u-visually-hide">Go to page</span> 1</a></li>
                            <li className="c-pagination__item"><a href="" className="c-pagination__link"><span className="u-visually-hide">Go to page</span> 2</a></li>
                            <li className="c-pagination__item"><a href="" className="c-pagination__link"><span className="u-visually-hide">Go to page</span> 3</a></li>
                            <li className="c-pagination__item"><a href="" className="c-pagination__link"><span className="u-visually-hide">Go to page</span> 4</a></li>
                            <li className="c-pagination__item c-pagination__item--next">
                                <a href="" className="c-pagination__link"><span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Next </span><span className="u-visually-hide">page</span>
                                    <ArrowRightIcon />
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Pagination