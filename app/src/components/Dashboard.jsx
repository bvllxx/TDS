import React from "react";

export function DashboardContent(){
    return (
        <>
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 justify-content-center" data-bs-theme="dark">
            <div className="list-group">
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                        <h6 className="mb-0">Proyecto </h6>
                        <p className="mb-0 opacity-75">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci perspiciatis quas tempore, quisquam similique dolores cumque vero minima totam ipsa magni officiis libero error, placeat qui amet atque laudantium?</p>
                        </div>
                        <small className="opacity-50 text-nowrap">24/02/99</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                        <h6 className="mb-0">Proyecto 2</h6>
                        <p className="mb-0 opacity-75">Algún contenido de marcador de posición en un párrafo es un poco más largo y se ajusta a una nueva línea.</p>
                        </div>
                        <small className="opacity-50 text-nowrap">24/02/99</small>
                    </div>
                </a>
            </div>
        </div>
        </>
    )
}

export default DashboardContent;