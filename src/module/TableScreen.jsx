import React from "react";
import { Container, UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2, DateTime } from "asab_webui_components";
import axios from "axios";

export function TableScreen(props) {
	const { t } = useTranslation();

	const columns = [
		{
			title: "Username",
			render: ({ row }) => {
				const tooltipId = `tooltip-${row.id}`;
				return (
					<>
						<a id={tooltipId}>{row.username}</a>
						<UncontrolledTooltip target={tooltipId}>
							{row.id}
						</UncontrolledTooltip>
					</>
				);
			},
		},
		{
			title: "Email",
			render: ({ row }) => row.email,
		},
		{
			title: "Created",
			render: ({ row }) => <DateTime value={row.created} />,
		},
		{
			title: "Last Sign In",
			render: ({ row }) => <DateTime value={row.last_sign_in} />,
		},
		{
			title: "Address",
			render: ({ row }) => row.address,
		},
	];

	const loader = async ({ params, setRows, setCount }) => {
		let response = await axios.get("https://devtest.teskalabs.com/data", {
			params: params,
		});
		const rows = response.data.data;
		const count = response.data.count;
		setRows(rows);
		if (response.data.count != undefined) {
			setCount(count);
		} else {
			setCount(rows.length);
		}
		console.log(count);
	};

	return (
		<Container className="h-100">
			<DataTableCard2 columns={columns} loader={loader} />
		</Container>
	);
}
