import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { NetworkId, WalletAddress } from "../../model/address";
import { ReducerConfigure } from "../../redux";
import actions from "../../redux/wallet/walletActions";
import AddressItem from "./AddressItem/AddressItem";
import "./AddressList.css";

interface StateProps {
    platformAddresses?: WalletAddress[];
    assetAddresses?: WalletAddress[];
    networkId: NetworkId;
    isLoadingAssetAddresses?: boolean | null;
    isLoadingPlatformAddresses?: boolean | null;
}

interface DispatchProps {
    fetchWalletFromStorageIfNeed: () => void;
    createWalletAssetAddress: () => void;
    createWalletPlatformAddress: () => void;
}
type Props = StateProps & DispatchProps;

class AddressList extends React.Component<Props, any> {
    public componentDidMount() {
        this.props.fetchWalletFromStorageIfNeed();
    }
    public componentWillReceiveProps(props: Props) {
        const { networkId } = this.props;
        const { networkId: nextNetworkId } = props;
        if (networkId !== nextNetworkId) {
            this.props.fetchWalletFromStorageIfNeed();
        }
    }
    public render() {
        const { platformAddresses, assetAddresses, networkId } = this.props;
        return (
            <div className="Address-list animated fadeIn">
                <Container>
                    <div className="asset-address-container mb-5">
                        <div className="deco asset-title-deco" />
                        <h5 className="mb-1">Asset Address</h5>
                        <div className="mb-4 address-description">
                            <span>
                                This is an address that can be used to mint or
                                trade new tokens.
                            </span>
                        </div>
                        <Row className="address-item-container">
                            {_.map(assetAddresses, (address, index: number) => (
                                <Col md={6} lg={4} xl={3} key={index}>
                                    <AddressItem walletAddress={address} />
                                </Col>
                            ))}
                            <Col md={6} lg={4} xl={3}>
                                {!assetAddresses ? (
                                    <div className="restoring">
                                        Restoring asset address ...
                                    </div>
                                ) : (
                                    <div>
                                        <div
                                            onClick={this.createAssetAddress}
                                            className="add-address-btn d-flex align-items-center justify-content-center"
                                        >
                                            ADD ADDRESS
                                            <FontAwesomeIcon
                                                className="ml-2"
                                                icon="plus-circle"
                                            />
                                        </div>
                                        {assetAddresses.length > 0 && (
                                            <Link to="/mint">
                                                <div className="mint-asset-btn d-flex align-items-center justify-content-center">
                                                    Mint a new asset
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <hr />
                    <div className="platform-address-container">
                        <div className="deco platform-title-deco" />
                        <h5 className="mb-1">CCC Address</h5>
                        <div className="mb-4 address-description">
                            <span>
                                This is an address that can be used to store
                                CCC, which is used to transfer tokens or as
                                transaction fees.
                            </span>
                        </div>
                        <Row className="address-item-container">
                            {_.map(
                                platformAddresses,
                                (address, index: number) => (
                                    <Col md={6} lg={4} xl={3} key={index}>
                                        <AddressItem walletAddress={address} />
                                    </Col>
                                )
                            )}
                            <Col md={6} lg={4} xl={3}>
                                {!platformAddresses ? (
                                    <div className="restoring">
                                        Restoring CCC address ...
                                    </div>
                                ) : (
                                    <div>
                                        <div
                                            onClick={this.createPlatformAddress}
                                            className="add-address-btn d-flex align-items-center justify-content-center"
                                        >
                                            ADD ADDRESS
                                            <FontAwesomeIcon
                                                className="ml-2"
                                                icon="plus-circle"
                                            />
                                        </div>
                                        {platformAddresses.length > 0 &&
                                            (networkId === "cc" ? (
                                                <Link to="/chargeCCC">
                                                    <div className="buy-CCC-btn d-flex align-items-center justify-content-center">
                                                        Charge CCC
                                                    </div>
                                                </Link>
                                            ) : (
                                                <a
                                                    href="https://corgi.codechain.io/faucet"
                                                    target="_blank"
                                                >
                                                    <div className="buy-CCC-btn d-flex align-items-center justify-content-center">
                                                        CodeChain Faucet
                                                    </div>
                                                </a>
                                            ))}
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
    private createPlatformAddress = async () => {
        const { createWalletPlatformAddress } = this.props;
        createWalletPlatformAddress();
    };

    private createAssetAddress = async () => {
        const { createWalletAssetAddress } = this.props;
        createWalletAssetAddress();
    };
}
const mapStateToProps = (state: ReducerConfigure) => ({
    platformAddresses: state.walletReducer.platformAddresses,
    assetAddresses: state.walletReducer.assetAddresses,
    networkId: state.globalReducer.networkId,
    isLoadingAssetAddresses: state.walletReducer.isLoadingAssetAddresses,
    isLoadingPlatformAddresses: state.walletReducer.isLoadingPlatformAddresses
});
const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReducerConfigure, void, Action>
) => ({
    fetchWalletFromStorageIfNeed: () => {
        dispatch(actions.fetchWalletFromStorageIfNeed());
    },
    createWalletPlatformAddress: () => {
        dispatch(actions.createWalletPlatformAddress());
    },
    createWalletAssetAddress: () => {
        dispatch(actions.createWalletAssetAddress());
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressList);
