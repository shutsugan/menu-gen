import React from 'react';
import { Link } from 'react-router-dom';

const SwitchLink = ({to, label}) => (
    <div className="flex center full">
        <p className="sub-text sm-f">Don't have an account?</p>
        <Link className="link sm-f" to={to}>{label}</Link>
    </div>
);

export default SwitchLink;