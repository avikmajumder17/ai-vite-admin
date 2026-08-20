import "./Loader.css";



export const Loader = () => {
    return (
        <div className="rfc-wrapper">
            <div className="diafmsdf">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                    <defs>
                        <filter id="rfc-goo-blur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                                result="goo"
                            />
                        </filter>
                    </defs>
                </svg>
                <div className="rfc-goo-container">
                    <div className="rfc-goo-blob" />
                    <div className="rfc-goo-blob" />
                    <div className="rfc-goo-blob" />
                    <div className="rfc-goo-blob" />
                </div>
            </div>
        </div>
    )
}