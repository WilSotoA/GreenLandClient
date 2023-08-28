import styled from "./Paginate.module.css";
import { useDispatch } from "react-redux";
import { paginatePrev, paginateNext, paginateNumPage } from "../../redux/action"


export const Pagination = ({ numPage, cantPage }) => {
    const dispatch = useDispatch();

    const onclickNumPage = (event) => {
        const value = event.target.innerText
        const num   = dispatch(paginateNumPage(value))
    }

    return (
        <div className={styled.container}>
            <div className={styled.paginate}>
                {
                    numPage <= 1 ? (
                        <div className={styled.prev}>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <div className={styled.prev}>
                            <button className={styled.buttons}
                                onClick={() => dispatch(paginatePrev())}>
                                PREV
                            </button>
                        </div>
                    )
                }

                <div className={styled.pageNum}>
                    {numPage <= 2 ? (<h5></h5>)  : (<h5 onClick={onclickNumPage}>{numPage - 2}</h5>)}
                    {numPage === 1 ? (<h5></h5>) : (<h5 onClick={onclickNumPage}>{numPage - 1}</h5>)}
                    <h2>{numPage}</h2>
                    {(numPage + 1) > cantPage ? (<h5></h5>) : (<h5 onClick={onclickNumPage}>{numPage + 1}</h5>)}
                    {(numPage + 2) > cantPage ? (<h5></h5>) : (<h5 onClick={onclickNumPage}>{numPage + 2}</h5>)}
                </div>


                {
                    numPage >= cantPage ? (
                        <div className={styled.next}>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <div className={styled.next}>
                            <button className={styled.buttons} onClick={() => dispatch(paginateNext())}>
                                NEXT
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}