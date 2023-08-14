import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FileEarmarkPdf, FileEarmarkWord, FileEarmarkBarGraph, FileEarmarkImage, FileEarmarkSlides, FileEarmarkText, FileTextFill, FileEarmarkZip, FileEarmarkEasel, Download, Trash } from 'react-bootstrap-icons';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const ViewAllFiles = () => {
  const [files, setFiles] = useState([]);
  const [verify, setVerify] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  let { verifyUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get('http://localhost:3001/api/files', {
          headers: { Authorization: `Bearer ${localStorage.getItem('myUserToken')}` },
        });
        setFiles(response.data);
      } catch (error) {
        console.log(error);
      }
      setVerify(await verifyUser());
    }

    const token = localStorage.getItem('myUserToken');
    if (token) {
      fetchFiles();
    }
  }, []);

  const handleDelete = (e, id) => {
    axios
      .delete(`http://localhost:3001/api/files/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('myUserToken')}` },
      })
      .then((response) => {
        console.log(response);
        const updatedFiles = files.filter((file) => file.fileId !== id);
        setFiles(updatedFiles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const fileTypeIcons = {
    pdf: <FileEarmarkPdf />,
    doc: <FileEarmarkWord />,
    docx: <FileEarmarkWord />,
    pages: <FileEarmarkWord />,
    xlsx: <FileEarmarkBarGraph />,
    numbers: <FileEarmarkBarGraph />,
    png: <FileEarmarkImage />,
    jpg: <FileEarmarkImage />,
    jpeg: <FileEarmarkImage />,
    ppt: <FileEarmarkSlides />,
    keynote: <FileEarmarkSlides />,
    txt: <FileEarmarkText />,
    svg: <FileEarmarkText />,
    ai: <FileEarmarkText />,
    zip: <FileEarmarkZip />,
  };

  const getFileTypeIcon = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (fileTypeIcons[fileExtension]) {
      return fileTypeIcons[fileExtension];
    }
    return <FileTextFill />;
  };

  const sortedFiles = files.sort((a, b) => {
    const fileNameA = a.fileName.toLowerCase();
    const fileNameB = b.fileName.toLowerCase();
    if (sortOrder === 'asc') {
      return fileNameA.localeCompare(fileNameB);
    } else {
      return fileNameB.localeCompare(fileNameA);
    }
  });

  const filteredFiles = sortedFiles.filter((file) => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

  if (verify) {
    return (
      <Container className="page-container">
        <h1 className="display-5" style={{ paddingBottom: '20px' }}>
          My Files
        </h1>

        <Row>
          <Col md={6} className="custom-search d-flex align-items-center">
            <Form.Control type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearch} />
          </Col>

          <Col md={6} className="d-flex align-items-center custom-sort-upload">
            <Form.Select className="custom-select" value={sortOrder} onChange={handleSort}>
              <option value="asc">Sort A to Z</option>
              <option value="desc">Sort Z to A</option>
            </Form.Select>
            <Button className="custom-upload-button" style={{ marginLeft: '20px' }} href="http://localhost:3000/uploadfiles">
              Upload File
            </Button>
          </Col>
        </Row>

        <Table borderedStyle={{ border: 'none' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black' }}>
              <th>Type</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.fileId} style={{ borderBottom: '1px solid black' }}>
                <td className={`filetype-icon table-cell-center`}>{getFileTypeIcon(file.fileName)}</td>
                <td className={`table-cell-center`}>{file.fileName}</td>
                <td className={`table-cell-center`}>{file.description}</td>
                <td className={`table-cell-center`}>
                  <Link className="icon-link" to={`http://localhost:3001/api/files/download/${file.storedName}`}>
                    <Download />
                  </Link>
                  <Link className="icon-link" to="#" onClick={(e) => handleDelete(e, file.fileId)}>
                    <Trash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <h2>403 NOT SIGNED IN</h2>;
  }
};

export default ViewAllFiles;
