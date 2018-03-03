import React from 'react';

const Signature = (props) => {
	return (
		<div style={styles.signatureStyle}>
			<p>
				Coded by <a style={styles.linkStyle} href={props.portfolioLink}>{props.name}</a><br />
				Github Repo: <a style={styles.linkStyle} href={props.githubLink}>{props.githubLink}</a><br />
			</p>
		</div>
	);
}
const styles = {
	signatureStyle: {
		textAlign: 'center'
	}
}
export default Signature;