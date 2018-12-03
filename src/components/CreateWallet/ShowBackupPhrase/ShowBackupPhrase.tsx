import * as React from "react";
import "./ShowBackupPhrase.css";

interface Props {
    onSubmit: () => void;
}

class ShowBackupPhrase extends React.Component<Props, any> {
    public componentDidMount() {
        window.scrollTo(0, 0);
    }
    public render() {
        const { onSubmit } = this.props;
        return (
            <div className="Show-backup-phrase">
                <div className="title-container">
                    <h4 className="title">
                        Your
                        <br />
                        backup phrase
                    </h4>
                </div>
                <div className="text-1">
                    Your secret backup phrase makes it easy to back up and
                    restore your account.
                </div>
                <div className="warning-text">
                    WARNING: Never disclose your backup phrase. Anyone with this
                    phrase can take your Asset forever.
                </div>
                <div className="tips-container">
                    <p className="tips-text mb-0">Tips :</p>
                    <span className="text-2">
                        Store this phrase in a password manager like 1 Password.
                        Write this phrase on a piece of paper and store in a
                        secure location. If you want even more security, write
                        it down on multiple pieces of paper and store each in 2
                        - 3 different locations.
                    </span>
                </div>
                <div className="backup-phrase-container">
                    <div className="backup-phrase-panel d-flex align-items-center justify-content-center">
                        popular fence nominee wear north tattoo ethics deputy
                        raven obey junk guard
                    </div>
                </div>
                <div>
                    <button
                        className="btn btn-primary reverse square main-btn"
                        onClick={onSubmit}
                    >
                        I MEMORIZED MY BACKUP PHRASE
                    </button>
                </div>
            </div>
        );
    }
}

export default ShowBackupPhrase;