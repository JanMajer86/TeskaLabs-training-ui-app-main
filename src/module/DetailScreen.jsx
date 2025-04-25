import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	Button,
	Container,
	Card,
	CardHeader,
	CardBody,
	Spinner,
	ListGroup,
	ListGroupItem,
	CardFooter,
} from "reactstrap";
import { DateTime } from "asab_webui_components";
import { BootstrapIcon } from "./BootstrapIcon";

export function DetailScreen() {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const margin = { marginRight: "8px" };

	const fetchDetails = async () => {
		try {
			const response = await axios.get(
				`https://devtest.teskalabs.com/detail/${id}`
			);
			setData(response.data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchDetails();
	}, []);

	if (isLoading) {
		return (
			<Container className="h-100">
				<Spinner />
			</Container>
		);
	}

	if (error) {
		return (
			<Container className="h-100">
				<p>{error}</p>
			</Container>
		);
	}

	return (
		<Container className="h-100">
			<Card style={{ width: "30rem" }}>
				<CardHeader>user details</CardHeader>
				<CardBody>
					<ListGroup flush>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-person-circle" />
							username: {data.username}
						</ListGroupItem>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-envelope" />
							email: {data.email}
						</ListGroupItem>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-calendar3" />
							created: <DateTime value={data.created} />
						</ListGroupItem>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-stopwatch" />
							last sign-in: <DateTime value={data.last_sign_in} />
						</ListGroupItem>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-geo-alt-fill" />
							address: {data.address}
						</ListGroupItem>
						<ListGroupItem>
							<BootstrapIcon icon="bi bi-telephone" />
							phone number: {data.phone_number}
						</ListGroupItem>
						<ListGroupItem>ip address: {data.ip_address}</ListGroupItem>
						<ListGroupItem>mac address: {data.mac_address}</ListGroupItem>
						<ListGroupItem></ListGroupItem>
					</ListGroup>
				</CardBody>
				<CardFooter>
					<Link to="/">
						<Button>go back</Button>
					</Link>
				</CardFooter>
			</Card>
		</Container>
	);
}
