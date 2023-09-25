function FinishButton({ onClick }) {
    // <button onClick={onClick}>Submit</button>
    return (
        <div className="mr-5">
            <button className="btn btn-lg btn-success" onClick={onClick}>
                Finish Game
            </button>
        </div>
    );
}

export default FinishButton;
